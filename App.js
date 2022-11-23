import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import orm from "./common/orm";

export default function App() {
  const emptyDBState = orm.getEmptyState();
  console.log("emptyDBState -> ", emptyDBState);

  const session = orm.session(emptyDBState);
  // console.log("session -> ", session);

  const Book = session.Book;
  console.log("***ZEntry -> ", Book);
  //
  //
  Book.create({
    id: 1,
    name: "11AM CONVERT TO DATE FORM",
  });
  Book.create({
    id: 2,
    name: "12AM CONVERT TO DATE FORM",
  });
  console.log("***first -> ", Book.first());
  //
  //
  console.log(
    "***filtered -> ",
    Book.all()
      .filter((book) => book.name === "updatedbook")
      .toRefArray()
  );
  //
  //
  Book.withId(1).update({ name: "updatedbook" });

  let modelArr = Book.all().toModelArray();
  console.log("***modelArr -> ", modelArr);
  //
  //
  console.log(
    "***Exclude ub -> ",
    Book.exclude({ name: "updatedbook" }).delete()
  );
  //
  //

  console.log("***delete 12am -> ", Book.all().toModelArray());

  const updatedDBState = session.state;
  console.log("***updatedDBState -> ", updatedDBState);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
