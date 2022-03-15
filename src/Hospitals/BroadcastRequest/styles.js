import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    paddingHorizontal: 10,
  },

  filterContainer: {
    flexDirection: "row",
  },

  countryDropDown: {
    flex: 1,
    marginRight: 4,
  },

  cityDropdownStyle: {
    flex: 1,
    marginLeft: 4,
  },

  emptyComponentStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});

export default styles;
