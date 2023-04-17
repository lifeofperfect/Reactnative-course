import { View, Text, StyleSheet, TextInput, Button, ScrollView, FlatList, Pressable } from "react-native"
import { useState } from "react"
import ApiCall from "./components/apicalls";



export default function App() {
  const [value, setValue] = useState('');
  const [listOfNotes, setListOfNotes] = useState([])

  function handleOnChangeText(enteredText) {
    setValue(enteredText)
  }

  function handleOnPressButton() {
    setListOfNotes(currotes => [...currotes, value])
    setValue("")
  }

  function handleRemovePress(currIndex) {
    let copyListNotes = [...listOfNotes]

    copyListNotes = copyListNotes.filter((_, index) => currIndex != index)

    setListOfNotes(copyListNotes)
  }


  return (
    <View style={{
      padding: 60,
      flex: 1,
      paddingHorizontal: 15
    }}>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={handleOnChangeText}
          style={styles.input}
          placeholder="Add your Note here!!"
          value={value}
        />
        <Button onPress={handleOnPressButton} color={'#000'} title="Add Note" />
      </View>

      <View style={styles.listContainer}>

        <FlatList
          data={listOfNotes}
          renderItem={(itemData) => (
            <Pressable onPress={() => handleRemovePress(itemData.index)}>
              <Text style={styles.listItem}>{itemData.item}</Text>
            </Pressable>

          )}
        />

        {/* <ScrollView>
          {listOfNotes.map((item, index) => (
            <Text style={styles.listItem} key={`item${index}`}>{item}</Text>
          ))}
        </ScrollView> */}
      </View>

      <View>
        <ApiCall />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    paddingBottom: 30,
    borderBottomWidth: 1
  },
  input: {
    flex: 1,
    marginRight: 3,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  listContainer: {
    paddingTop: 30
  },
  listItem: {
    backgroundColor: 'green',
    color: '#fff',
    margin: 20,
    padding: 20,
    fontSize: 20,
    borderRadius: 1,
    textAlign: 'center'
  }
})