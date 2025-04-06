import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import FlashMessage from "react-native-flash-message";
import Navi from './src/navigation/Navi';

export default function App() {
  return (<>
    <StatusBar style="dark" />
    <Navi />
    <FlashMessage position="top" /> 
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
