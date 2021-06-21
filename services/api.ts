import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore';

// ADD, GET, UPDATE, DELETE

export const addBudget = (
  budget:string,
  uid:string,
  currentDate: { year:string, month:string }
  ) => {
  const budgetRef = firestore().collection('users').doc(uid).collection('budget')
    const { year, month } = currentDate

  return budgetRef.add({
    budget,
    year,
    month,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
}

export const getBudget = (uid:string, currentDate: { year:string, month:string }) => new Promise((resolve, reject) => {

  const { year, month } = currentDate

  firestore().collection(`users/${uid}/budget`)
  .where('year', "==", year)
  .where('month', "==", month)
  .get()
  .then(querySnapshot => {
    const { docs, empty } = querySnapshot

    if(!empty) {
      const doc = docs[0].data()

      resolve({ exists: docs[0].exists, id: docs[0].id, ...doc })
    } else {
      resolve({ exists: false })
    }

  })
  .catch(error => reject(error))
})

export const updateBudget = (budget:string, uid:string, docId:string) => {
  const budgetDocRef = firestore().collection(`users/${uid}/budget`).doc(docId)

  return budgetDocRef.update({
    budget
  })
}

export const addEgreso = (uid:string, egresoId:string, egresoValues:object ) => {
  const docEgresoRef = firestore().collection(`users/${uid}/egreso`).doc(egresoId)

  return docEgresoRef.set({
    ...egresoValues,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
}

export const getEgreso = (uid:string, currentDate: { year:string, month:string }) => new Promise((resolve, reject) => {
  const { year, month } = currentDate

  firestore().collection(`users/${uid}/egreso`)
  .where('year', "==", year)
  .where('month', "==", month)
  .where('active', "==", true)
  .get()
  .then(querySnapshot => {
    const { docs, empty } = querySnapshot

    if(empty) {
      resolve({ egreso: 0 })
    } else {
      const documents = docs.map(doc => doc.data().mount)
      const sum:number = documents.reduce((acc, current) => parseInt(acc) + parseInt(current), 0)

      resolve({ egreso: sum })
    }

  })
  .catch(error => reject(error))
})

export const updateEgreso = (uid:string, docId:string, values:object) => {
  const userRef = firestore().collection(`users/${uid}/egreso`).doc(docId)

  return userRef.update({
    ...values
  })
}

export const deleteEgreso = (uid:string, docId:string) => {
  const docRef = firestore().collection(`users/${uid}/egreso`).doc(docId)

  return docRef.delete()
}

export const addItem = (values:object, uid:string) => new Promise ((resolve, reject) => {
  const newDocRef = firestore().collection(`users/${uid}/data`).doc()
  const egresoId = newDocRef.id

  newDocRef.set({
    ...values,
    egresoId,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => resolve({ egresoId }))
  .catch(error => reject(error))
})

export const updateItem = (uid:string, docId:string, values:object) => {
  const docRef = firestore().collection(`users/${uid}/data`).doc(docId)

  return docRef.update({
    ...values
  })

}

export const deleteItem = (uid:string, docId:string) => {
  const docRef = firestore().collection(`users/${uid}/data`).doc(docId)

  return docRef.delete()
}