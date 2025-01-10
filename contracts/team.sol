// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract ResearchDAO {
    
    uint256 public teamCount = 0;
    uint256 public ideaCount = 0;

    struct Team {
        uint256 id;
        string name;
        address leader;
        address[] members;
    }

    struct Idea {
        uint256 id;
        string description;
        uint256 teamId;
        mapping(address => bool) votes;
        uint256 voteCount;
        bool approved;
        address[] assignedMembers;
        uint256 deadline;
        string codeAccessLink;
    }

    mapping(uint256 => Team) public teams;
    mapping(uint256 => Idea) private ideas;

    // Events
    event TeamCreated(uint256 teamId, string name, address leader);
    event PollCreated(uint256 teamId, address proposedMember, bool isAddition);
    event MemberAdded(uint256 teamId, address member);
    event MemberRemoved(uint256 teamId, address member);
    event IdeaProposed(uint256 ideaId, uint256 teamId, string description);
    event IdeaApproved(uint256 ideaId);
    event MembersAssigned(uint256 ideaId, address[] assignedMembers, uint256 deadline, string codeAccessLink);

    // Modifiers
    modifier onlyLeader(uint256 _teamId) {
        require(teams[_teamId].leader == msg.sender, "Not the team leader");
        _;
    }

    modifier onlyTeamMember(uint256 _teamId) {
        bool isMember = false;
        for (uint i = 0; i < teams[_teamId].members.length; i++) {
            if (teams[_teamId].members[i] == msg.sender) {
                isMember = true;
                break;
            }
        }
        require(isMember, "Not a team member");
        _;
    }

    // 1️⃣ Create a Team
    function createTeam(string memory _name) external {
        Team storage newTeam = teams[teamCount];
        newTeam.id = teamCount;
        newTeam.name = _name;
        newTeam.leader = msg.sender;
        newTeam.members.push(msg.sender);

        emit TeamCreated(teamCount, _name, msg.sender);
        teamCount++;
    }

    // 2️⃣ Poll System to Add/Remove Members
    mapping(uint256 => mapping(address => mapping(address => bool))) public addMemberPoll;
    mapping(uint256 => mapping(address => mapping(address => bool))) public removeMemberPoll;

    function proposeAddMember(uint256 _teamId, address _newMember) external onlyTeamMember(_teamId) {
        emit PollCreated(_teamId, _newMember, true);
    }

    function voteToAddMember(uint256 _teamId, address _newMember) external onlyTeamMember(_teamId) {
        require(!addMemberPoll[_teamId][_newMember][msg.sender], "Already voted");
        addMemberPoll[_teamId][_newMember][msg.sender] = true;

        if (isPollPassed(_teamId, addMemberPoll[_teamId][_newMember])) {
            teams[_teamId].members.push(_newMember);
            emit MemberAdded(_teamId, _newMember);
        }
    }

    function proposeRemoveMember(uint256 _teamId, address _member) external onlyTeamMember(_teamId) {
        emit PollCreated(_teamId, _member, false);
    }

    function voteToRemoveMember(uint256 _teamId, address _member) external onlyTeamMember(_teamId) {
        require(!removeMemberPoll[_teamId][_member][msg.sender], "Already voted");
        removeMemberPoll[_teamId][_member][msg.sender] = true;

        if (isPollPassed(_teamId, removeMemberPoll[_teamId][_member])) {
            removeMemberFromTeam(_teamId, _member);
            emit MemberRemoved(_teamId, _member);
        }
    }

    function isPollPassed(uint256 _teamId, mapping(address => bool) storage poll) internal view returns (bool) {
        uint256 votes = 0;
        for (uint i = 0; i < teams[_teamId].members.length; i++) {
            if (poll[teams[_teamId].members[i]]) {
                votes++;
            }
        }
        return votes > teams[_teamId].members.length / 2;
    }

    function removeMemberFromTeam(uint256 _teamId, address _member) internal {
        address[] storage members = teams[_teamId].members;
        for (uint i = 0; i < members.length; i++) {
            if (members[i] == _member) {
                members[i] = members[members.length - 1];
                members.pop();
                break;
            }
        }
    }

    // 3️⃣ Idea Proposal & Voting
    function proposeIdea(uint256 _teamId, string memory _description) external onlyTeamMember(_teamId) {
        Idea storage newIdea = ideas[ideaCount];
        newIdea.id = ideaCount;
        newIdea.description = _description;
        newIdea.teamId = _teamId;

        emit IdeaProposed(ideaCount, _teamId, _description);
        ideaCount++;
    }

    function voteOnIdea(uint256 _ideaId) external onlyTeamMember(ideas[_ideaId].teamId) {
        Idea storage idea = ideas[_ideaId];
        require(!idea.votes[msg.sender], "Already voted");
        idea.votes[msg.sender] = true;
        idea.voteCount++;

        if (idea.voteCount > teams[idea.teamId].members.length / 2) {
            idea.approved = true;
            emit IdeaApproved(_ideaId);
        }
    }

    // 📖 Helper Functions
    function getTeamMembers(uint256 _teamId) external view returns (address[] memory) {
        return teams[_teamId].members;
    }

    function getIdeaDetails(uint256 _ideaId) external view returns (string memory, bool, uint256, string memory) {
        Idea storage idea = ideas[_ideaId];
        return (idea.description, idea.approved, idea.deadline, idea.codeAccessLink);
    }
    function getTeamMemberCount(uint256 _teamId) external view returns (uint256) {
    return teams[_teamId].members.length;
}

}

