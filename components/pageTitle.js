import {Image, StyleSheet, Pressable, Text, View} from "react-native";
import arrowBackImage from '../assets/ion_arrow-back.png';

import Theme from "../utils/Theme";
// Import all colors defined in defaultColors.js
const { colors } = Theme;

const PageTitle = () => {
  	return (
    		<View style={styles.pageTitle}>
          <Text style={styles.pageName}>Book Details</Text>
    		</View>);
};

const styles = StyleSheet.create({
  	pageName: {
    		fontSize: 16,
    		textTransform: "capitalize",
    		fontWeight: "600",
    		color: colors.White,
    		textAlign: "center",
    		position: "absolute"
  	},
  	pageTitle: {
    		flex: 1,
    		width: "100%",
        paddingTop: 82.31,
        backgroundColor: colors.PrimaryBlue,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
  	}
});

export default PageTitle;
