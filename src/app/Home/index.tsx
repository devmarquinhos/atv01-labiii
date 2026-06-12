import { useState } from "react";
import { View, Image, FlatList, TouchableOpacity, Text } from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { ListItem, ItemProps } from "@/components/ListItem";

import { FilterStatus } from "@/types/FilterStatus";

import { styles } from "./styles";

export function Home() {
  // estados dos itens, do input e do filtro da lista
  const [items, setItems] = useState<ItemProps[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterStatus>(
    FilterStatus.PENDING,
  );

  // Lógica para adicionar um novo item
  function handleAddItem() {
    if (!inputValue.trim()) return;

    const newItem: ItemProps = {
      id: String(new Date().getTime()),
      name: inputValue.trim(),
      status: FilterStatus.PENDING,
    };

    setItems((prevState) => [...prevState, newItem]);
    setInputValue("");
  }

  // filtro (comprou e não comprou)
  function handleToggleStatus(id: string) {
    setItems((prevState) =>
      prevState.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status:
              item.status === FilterStatus.PENDING
                ? FilterStatus.DONE
                : FilterStatus.PENDING,
          };
        }
        return item;
      }),
    );
  }

  // apagar item da lista
  function handleRemoveItem(id: string) {
    setItems((prevState) => prevState.filter((item) => item.id !== id));
  }

  // apagar lista de compras
  function handleClearList() {
    setItems((prevState) =>
      prevState.filter((item) => item.status !== activeFilter),
    );
  }

  // filtro das listas comprados e não comprados (alterna entre elas)
  const currentItems = items.filter((item) => item.status === activeFilter);

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input
          placeholder="O que você precisa?"
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={handleAddItem}
        />

        <Button title="Adicionar" activeOpacity={0.7} onPress={handleAddItem} />
      </View>

      <View style={styles.content}>
        <View style={styles.filterHeader}>
          <View style={styles.filterGroup}>
            <Filter
              status={FilterStatus.PENDING}
              isActive={activeFilter === FilterStatus.PENDING}
              onPress={() => setActiveFilter(FilterStatus.PENDING)}
            />
            <Filter
              status={FilterStatus.DONE}
              isActive={activeFilter === FilterStatus.DONE}
              onPress={() => setActiveFilter(FilterStatus.DONE)}
            />
          </View>

          <TouchableOpacity onPress={handleClearList}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {/* lista de itens, */}
        <FlatList
          data={currentItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListItem
              data={item}
              onToggle={handleToggleStatus}
              onRemove={handleRemoveItem}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum item nesta lista.</Text>
          }
        />
      </View>
    </View>
  );
}
