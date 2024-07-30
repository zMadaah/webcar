import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import { Header } from '../../components/header'
import { Input } from '../../components/input'
import { db } from '../../service/firebaseConnection'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { CarsProps } from '../../types/cars.type'
import { CarItem } from '../../components/carlist'

export function Home() {
  const [serachInput, setSearchInput] = useState("")
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      await loadCars();
    }

    fetchCars();
  }, [])

  async function loadCars() {
    const carsRef = collection(db, "cars")
    const queryRef = query(carsRef, orderBy("created", "desc"))

    getDocs(queryRef)
      .then((snapshot) => {
        let listcars = [] as CarsProps[];

        snapshot.forEach(doc => {
          listcars.push({
            id: doc.id,
            name: doc.data().name,
            year: doc.data().year,
            city: doc.data().city,
            km: doc.data().km,
            price: doc.data().price,
            uid: doc.data().uid,
            images: doc.data().images,
          })
        })

        setCars(listcars);
        setLoading(false);

      })


  }

  return (
    <>
      <Header />

      <View style={styles.container}>
        <View style={styles.inputArea}>
          <Input
            placeholder="Procurando algum carro?..."
            value={serachInput}
            onChangeText={(text) => setSearchInput(text)}
          />
        </View>

        {loading && (
          <ActivityIndicator style={{ marginTop: 14 }} size="large" color="#000" />
        )}

        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CarItem data={item} widthScreen={cars.length <= 1 ? "100%" : "49%"} />}
          style={styles.list}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 14 }}
          showsVerticalScrollIndicator={false}
        />

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f5f8",
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14,
    alignItems: 'center'
  },
  inputArea: {
    width: '100%',
    marginTop: 14,
    padding: 8,
    backgroundColor: "#FFF",
    borderRadius: 8,
  },
  list: {
    flex: 1,
    marginTop: 4,
    paddingTop: 14,
  }
})