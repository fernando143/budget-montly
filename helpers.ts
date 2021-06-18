import moment from 'moment'
import firestore from '@react-native-firebase/firestore';

export const getDateNow = () => {
  const date = new Date()
  const dateMoment = moment(date, "DD-MM-YYYY")
  const month = dateMoment.format('MM')
  const year = dateMoment.format('YYYY')

  return { year, month }
}

export const calculateRestante = (budget:number, egreso:number) => budget - egreso

export const getData = (uid, year, month, orderBy = { type: 'timestamp', order: 'asc' }) => new Promise((resolve, reject) => {
  let resultado = []

  firestore()
    .collection(`users/${uid}/data`)
    .where('year', "==", year)
    .where('month', "==", month)
    .orderBy(orderBy.type, orderBy.order)
    .get()
    .then(querySnapshot => {
      const { empty } = querySnapshot

      if(!empty) {
        querySnapshot.forEach(doc => {
          const document = doc.data()
          const docId = doc.id

          resultado.push({ ...document, docId })
        })
      }

      resolve({ data: resultado, empty })
    })

})