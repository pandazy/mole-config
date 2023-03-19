import { ProjectType } from './types';

export const TypeDependencies: Record<ProjectType, ProjectType[]> = {
  lib: [],
  'lib-react': ['lib'],
  'app-react': ['lib'],
  'app-rest': [],
};
