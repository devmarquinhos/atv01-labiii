import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  checkArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  name: {
    fontSize: 16,
    color: '#000',
    marginLeft: 12,
    fontWeight: '500',
  }
});