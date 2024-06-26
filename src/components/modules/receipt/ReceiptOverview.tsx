import React, { useState } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import ReceiptItem, { IReceipt } from "./ReceiptItem";
import FieldLabel from "../../ui/FieldLabel";
import ItemCard from "./ItemCard";
import Icon from 'react-native-vector-icons/FontAwesome';
import NextButton from "../../ui/NextButton";
import { ScrollView } from "react-native-gesture-handler";
import AddReceiptModal from "../../modals/AddReciptModal";
import EditAmountModal from "../../modals/EditAmountModal";
import ModalComponent from "../../Modal";
import ReceiptImageModal from "../../modals/ReceiptImageModal";
import AddReceiptCompleted from "../../modals/AddReceiptCompletedModal";


const ReceiptOverview = ({receipt})=>{
    const [receiptInfo, setReceiptInfo] = useState({
        receipt,
        amountIncludingTax: {
            title: '99.999,99 €',
            logo: "€",
            subtitle: 'Erstattetet: 66.666,66 €'
        },
        image:''
    });
    const [showAddReceiptModal, setShowAddReceiptModal] = useState(false);
    const [showEditAmountModal, setShowEditAmountModal] = useState(false);
    const [showReceiptImageModal, setShowReceiptImageModal] = useState(false);
    const [showCompletedModal, setShowCompletedModal] = useState(false);

    // const handleUpdateReceiptInfo = (values)=>{
    //     setReceiptInfo(preValue => ({...preValue, values}))
    // }
    const handleSubmitReceipt = ()=>{
        setShowCompletedModal(true);
    }
    return (
        <ScrollView contentContainerStyle={{width: '100%'}}>
            <View style={styles.container}>
            <View style={styles.overview}>
                <FieldLabel label="Dienstleistung">
                    <ReceiptItem receipt={{
                        company: {
                            logo: 'GF',
                            name: receiptInfo?.receipt.company?.name,
                            postCode: receiptInfo?.receipt.company?.postCode
                        },
                    }}
                    disabled={false}
                    onItemClicked={()=>console.log("receipt", receipt)}
                    showEditBtn={true}
                    onEditBtnPress={()=>setShowAddReceiptModal(true)}
                    />
                </FieldLabel>

                <FieldLabel label="Betrag inkl. MwSt.">
                    <ItemCard
                        item={receiptInfo.amountIncludingTax}
                        showEditBtn={true}
                        onItemClicked={()=>console.log("item clicked")}
                        onEditBtnPress={()=>setShowEditAmountModal(true)}
                    />
                </FieldLabel>

                <FieldLabel label="Beleg">
                    <ItemCard
                        item={{
                            title: '123-1234567-lbBeleg',
                            logo: <Icon name="file-text-o" size={20} />,
                            subtitle: 'Foto'
                        }}
                        showEditBtn={true}
                        onItemClicked={()=>console.log("item clicked")}
                        onEditBtnPress={()=>setShowReceiptImageModal(true)}
                    />
                </FieldLabel>

                <View>
                    <Text style={styles.confirmationText}>
                    Mit der Belegeinreichung bestätige ich, dass ich die angegebene Leistung persönlich in Anspruch genommen habe.
                    </Text>
                </View>
            </View>

            <NextButton 
            title="Beleg jetzt einreichen"
            onPress={handleSubmitReceipt}
            buttonStyles={{backgroundColor: '#309975'}}
            />

<AddReceiptModal
        visible={showAddReceiptModal}
        onClose={()=>setShowAddReceiptModal(false)} 
        defaultValue={receipt} 
        onAction={(values: Partial<IReceipt>)=>setReceiptInfo(preValue => ({
            ...preValue,
            receipt: values
        }))}
        />

        <EditAmountModal 
        receipt={receipt} 
        visible={showEditAmountModal}
        onClose={()=>setShowEditAmountModal(false)}
        onAction={(values)=>setReceiptInfo(preValue => ({
            ...preValue,
            amountIncludingTax: {
                ...preValue.amountIncludingTax,
                title: String(values)
            }
        }))}
        />

        <ReceiptImageModal
            visible={showReceiptImageModal}
            onClose={()=>setShowReceiptImageModal(false)}
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMp2QN2WCx7VRAXuJme-AcdxJJeXRSM3obFhXX_uIKvQ&s"
            onAction={()=>{}}
        />

        <AddReceiptCompleted
            visible={showCompletedModal}
            onClose={()=>setShowCompletedModal(false)}
        />

{/* <ModalComponent
    visible={showReceiptImageModal}
    onClose={()=>setShowReceiptImageModal(false)}
    headerComponent={}
  >
    {
      receipt && (<>
        <View style={{flex: 1, backgroundColor: 'red'}}>
          <Image style={{flex: 1, width: '100%',height: '100%',}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMp2QN2WCx7VRAXuJme-AcdxJJeXRSM3obFhXX_uIKvQ&s"/>
        </View>
      </>)
    }
  </ModalComponent> */}
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        gap: 40
    },
    overview: {
        display: 'flex',
        gap: 20
    },
    confirmationText: {
        color: '#454d66',
        fontFamily: '"OpenSans-Regular", "Open Sans", sans-serif'
    }
})

export default ReceiptOverview;