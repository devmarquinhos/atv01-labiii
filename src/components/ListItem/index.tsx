import { View, Text, TouchableOpacity } from 'react-native';
import { Trash } from 'lucide-react-native';

import { StatusIcon } from '../StatusIcon';
import { FilterStatus } from '@/types/FilterStatus';
import { styles } from './styles';

// tipagem do item da lista
export interface ItemProps {
  id: string;
  name: string;
  status: FilterStatus;
}

// prop dos componentes da lista (alterar entre status e remover da lista)
type Props = {
  data: ItemProps;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function ListItem({ data, onToggle, onRemove }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.checkArea} 
        onPress={() => onToggle(data.id)}
        activeOpacity={0.7}
      >
        <StatusIcon status={data.status} />
        <Text style={styles.name}>{data.name}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onRemove(data.id)} activeOpacity={0.7}>
        <Trash size={20} color="#999999" />
      </TouchableOpacity>
    </View>
  );
}