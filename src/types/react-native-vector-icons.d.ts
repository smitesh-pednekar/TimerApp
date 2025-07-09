declare module 'react-native-vector-icons/MaterialIcons' {
  import { Icon } from 'react-native-vector-icons/Icon';
  export default Icon;
}

declare module 'react-native-vector-icons/*' {
  const Icon: any;
  export default Icon;
}
