import { ProjectType } from './types';

const TypeDependencies: Record<ProjectType, ProjectType[]> = {
  lib: [],
  'lib-react': ['lib'],
  'app-react': ['lib'],
  'app-rest': [],
};

export default TypeDependencies;
