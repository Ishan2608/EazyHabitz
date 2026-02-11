import { StyleSheet } from "react-native";

export const theme = {
  colors: {
    primary_bg: '#ecebeb',
    button_bg: '#f49e24',
    primary_fg: '#131313',
    secondary_fg: '#5232ca',
    error: '#f21a2f'
  }
}

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#ffffff",
  },
  listContainer:{
    backgroundColor: theme.colors.primary_bg,
    padding: 15,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 8,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 20,
  },
  // Text styles
  'txt-lg': {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  'txt-md': {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  'txt-sm': {
    fontSize: 14,
    color: '#000000',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
  },
  // Link styles
  links: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  'links:visited': {
    color: '#fd7e14', 
  },
  // Button styles
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Error styles
  generalErrorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8d7da',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  generalErrorIcon: {
    marginRight: 10,
  },
  generalError: {
    color: '#721c24',
  },
});

export default globalStyles;
