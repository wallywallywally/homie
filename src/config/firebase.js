import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import { addDoc, collection } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABYMX5XFR_fVQCBHqpxlcWIWrmep8gWr8",
  authDomain: "homie-c8711.firebaseapp.com",
  projectId: "homie-c8711",
  storageBucket: "homie-c8711.firebasestorage.app",
  messagingSenderId: "260915466711",
  appId: "1:260915466711:web:5c5dcef5a4159843ee7b92",
  measurementId: "G-163E33J7V3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Export Firestore instance
export { db };
//----



/*async function addInputs_Offer_Letter(
  date1, seller_full_name1, seller_address1, buyer_full_name1, buyer_contact_information1,
  buyer_address1, property_address1, offer_price1, deposit_amount1, number_of_days_loan1,
  financing_type1, loan_amount1, number_of_days_deposit1, closing_date1, possession_date1,
  list_of_items1, credit_amount1, purpose1, expiration_date1, time
) {
  try {
    // Helper function to validate if a value is a float
    const toFloat = (value, fieldName) => {
      const floatValue = parseFloat(value);
      if (isNaN(floatValue)) {
        throw new Error(`${fieldName} must be a valid float.`);
      }
      return floatValue;
    };

    // Validate and convert fields to float
    const offer_price = toFloat(offer_price1, "offer_price1");
    const deposit_amount = toFloat(deposit_amount1, "deposit_amount1");
    const number_of_days_loan = toFloat(number_of_days_loan1, "number_of_days_loan1");
    const loan_amount = toFloat(loan_amount1, "loan_amount1");
    const number_of_days_deposit = toFloat(number_of_days_deposit1, "number_of_days_deposit1");
    const credit_amount = toFloat(credit_amount1, "credit_amount1");

    // Ensure list_of_items1 is an array
    if (!Array.isArray(list_of_items1)) {
      throw new Error("list_of_items1 must be an array.");
    }

    // Add the document to Firestore
    const docRef = await addDoc(collection(db, "inputs_for_offer_letter"), {
      date: date1,
      seller_full_name: seller_full_name1,
      seller_address: seller_address1,
      buyer_full_name: buyer_full_name1,
      buyer_contact_information: buyer_contact_information1,
      buyer_address: buyer_address1,
      property_address: property_address1,
      offer_price: offer_price,
      deposit_amount: deposit_amount,
      number_of_days_loan: number_of_days_loan,
      financing_type: financing_type1, // This is a string, so no conversion needed
      loan_amount: loan_amount,
      number_of_days_deposit: number_of_days_deposit,
      closing_date: closing_date1,
      possession_date: possession_date1,
      list_of_items: list_of_items1, // Already validated as an array
      credit_amount: credit_amount,
      purpose: purpose1,
      expiration_date: expiration_date1,
      time: time,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e.message);
  }
}



export default addInputs_Offer_Letter;*/
