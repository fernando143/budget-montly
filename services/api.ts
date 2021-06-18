import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore';

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

export const addEgreso = (egreso:string, uid:string, currentDate:{ year:string, month:string }) => {
  const egresoRef = firestore().collection(`users/${uid}/egreso`)
  const { year, month } = currentDate

  return egresoRef.add({
    egreso,
    year,
    month,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
}

export const getEgreso = (uid:string, currentDate: { year:string, month:string }) => new Promise((resolve, reject) => {
  const { year, month } = currentDate

  firestore().collection(`users/${uid}/egreso`)
  .where('year', "==", year)
  .where('month', "==", month)
  .get()
  .then(querySnapshot => {
    const { docs, empty } = querySnapshot

    if(empty) {
      resolve({ egreso: 0 })
    } else {
      const documents = docs.map(doc => doc.data().egreso)
      const sum:number = documents.reduce((acc, current) => parseInt(acc) + parseInt(current), 0)

      resolve({ egreso: sum })
    }

  })
  .catch(error => reject(error))
})

export const updateEgreso = (egreso:number, user:any) => {
  const userRef = firestore().collection('users').doc(user.uid)

  const sumEgreso = (currentEgreso:number, newEgreso:number) => {
    return currentEgreso + newEgreso
  }

  return userRef.update({
    egreso: sumEgreso(user.egreso, egreso)
  })
}

export const addItem = (values:object, uid:string) => {
  const dataRef = firestore().collection(`users/${uid}/data`)

  return dataRef.add({
    ...values,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
}