
import { CategoryButton } from '@/components/Category-Button'
import { Header } from '@/components/Header'
import { CATEGORIES } from '@/utils/data/products'
import { useState } from 'react'
import { FlatList, View } from 'react-native'

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0])
  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory)
  }

  return (
    <View className="flex-1 pt-8">
      <Header
        title="Cardápio"
        cartQuantityItems={10}
      />
      <FlatList
        data={CATEGORIES}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => handleCategorySelect(item)}
          />
        )}
        horizontal
        className='max-h-10 mt-5'
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}