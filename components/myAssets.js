import React from "react"
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native"

export default function BookItemGallery() {
  return (
    <View style={styles.BookItemGallery}>
      <View style={styles.Frame5}>
        <Image
          style={styles.Rectangle19}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/1y5913tmws6-8%3A24?alt=media&token=e6ce33f2-fa50-40d4-be74-8075b19431ed",
          }}
        />
        <View style={styles.Frame4}>
          <Text style={styles.BookTitle}>Book Title</Text>
          <Text style={styles.BookAuthor}>Book Author</Text>
          <Text style={styles.Genre}>Genre</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
})
