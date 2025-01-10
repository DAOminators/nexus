import os
import shutil

source_file = 'C:/Users/ppmpr/OneDrive/Documents/GitHub/nexus/public/images/papers/1.jpg'
destination_folder = 'C:/Users/ppmpr/OneDrive/Documents/GitHub/nexus/public/images/papers/'

for i in range(2, 51):
    destination_file = os.path.join(destination_folder, f'{i}.jpg')
    shutil.copy(source_file, destination_file)
    print(f'Copied {source_file} to {destination_file}')