
import { CategoryButton } from '@/components/Category-Button'
import { Header } from '@/components/Header'
import { Product } from '@/components/Product'
import { useCartStore } from '@/stores/cart-store'
import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products'
import { Link } from 'expo-router'
import { useRef, useState } from 'react'
import { FlatList, SectionList, Text, View } from 'react-native'

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0])
  const sectionListRef = useRef<SectionList<ProductProps>>(null)
  const cartStore = useCartStore()
  const cartQuantityItems = cartStore.products.reduce((total,product) =>total + product.quantity, 0 )

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory)
    const sectionIndex = CATEGORIES.findIndex((category) => category === selectedCategory)
    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0
      })
    }

  }

  return (
    <View className="flex-1 pt-8">
      <Header
        title="Cardápio"
        cartQuantityItems={cartQuantityItems}
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
      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={item => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link
            href={`/product/${item.id}`}
            asChild
          >
            <Product
              data={item}
            />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className='text-xl text-white font-heading mt-8 mb-3'>{title}</Text>
        )}
        className='flex-1 p-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100
        }}
      />
    </View>
  )
}