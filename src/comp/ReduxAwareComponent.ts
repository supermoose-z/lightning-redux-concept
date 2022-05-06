
import { createReduxAwareClass } from '../store/generator';
import { store } from '../store';

export const ReduxAwareComponent = createReduxAwareClass(store);
