import React, {ReactElement} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IItem {
  title: string;
  logo: string | ReactElement;
  subtitle: string;
}

interface ItemCardProps {
  item: IItem;
  onItemClicked?: (item: IItem) => void;
  disabled?: boolean;
  showEditBtn?: boolean;
  onEditBtnPress?: () => void;
}

const ItemCard = ({
  item,
  onItemClicked,
  disabled,
  showEditBtn,
  onEditBtnPress,
}: ItemCardProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onItemClicked(item)}
      disabled={disabled}>
      <View style={styles.itemLogo}>
        <Text style={styles.logoText}>{item.logo}</Text>
      </View>
      <View style={styles.itemInfo}>
        <View style={styles.itemTitleContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
        <View style={styles.itemSubtitleContainer}>
          <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
      {showEditBtn && (
        <TouchableOpacity onPress={onEditBtnPress}>
          <Text>
            <Icon name="pencil" size={25} color="#454d66" />
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 25,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    minHeight: 80,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  itemLogo: {
    width: 50,
    height: 50,
    padding: 10,
    backgroundColor: '#f8f6f4',
    color: '#fffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  logoText: {
    color: '#454d66',
    fontSize: 20,
    fontWeight: '600',
  },
  itemTitle: {
    color: '#454d66',
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'OpenSans-Regular',
  },
  itemTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  receiptAmountText: {
    fontSize: 21,
    fontWeight: '700',
    lineHeight: 24,
    color: '#454d66',
  },
  itemSubtitleContainer: {
    paddingTop: 0,
    paddingRight: 0,
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
  },
  itemSubtitle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
    lineHeight: 16,
    color: '#454d66',
  },
});
