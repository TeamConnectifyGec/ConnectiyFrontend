// import React from 'react';
// import { Pressable, StyleSheet, Text } from 'react-native';

// /* import the file and use <Button>
//  * Provide backgroundColor, textColor, onPress attributes to the element
//  * Enclose text like <Button>Text</Button>
//  */
// const Button = ({ backgroundColor, textColor, onPress, children, width = 150 }) => {
//   return (
//     <Pressable 
//       style={({ pressed }) => [
//         styles.button, 
//         { 
//           backgroundColor, width,
//           elevation: pressed ? 1 : 3, // Simulate an inward click by reducing elevation
//           transform: [{ scale: pressed ? 0.95 : 1 }] // Slightly scale down button when pressed
//         }
//       ]} 
//       onPress={onPress}
//     >
//       <Text style={[styles.buttonText, { color: textColor }]}>
//         {children}
//       </Text>
//     </Pressable>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 10,
//     elevation: 3,
//     backgroundColor: '#A98CE6', // Default color
//     width: 150,
//   },
//   buttonText: {
//     fontSize: 20,
//     lineHeight: 21,
//     fontWeight: 'bold',
//     letterSpacing: 0.25,
//   },
// });

// export default Button;

import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const Button = React.forwardRef(({ backgroundColor, textColor, onPress, children, width = 150 }, ref) => {
  return (
    <Pressable 
      ref={ref}
      style={({ pressed }) => [
        styles.button, 
        { 
          backgroundColor, width,
          elevation: pressed ? 1 : 3, // Simulate an inward click by reducing elevation
          transform: [{ scale: pressed ? 0.95 : 1 }] // Slightly scale down button when pressed
        }
      ]} 
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>
        {children}
      </Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#A98CE6', // Default color
    width: 150,
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
});

export default Button;
