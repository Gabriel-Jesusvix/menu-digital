import { Header } from "@/components/Header"
import { Input } from "@/components/Input"
import { Product } from "@/components/Product"
import { useCartStore } from "@/stores/cart-store"
import { formatCurrency } from "@/utils/functions/format-currency"
import { ScrollView, Text, View } from "react-native"


export default function Cart() {
  const cartStore = useCartStore()
  const total = formatCurrency(cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0))
  return (
    <View className="flex-1 pt-8">
      <Header
        title="Seu carinho"
      />
      <ScrollView>
        <View
          className="p-5 flex-1"
        >
          {
            cartStore.products.length > 0 ?
              cartStore.products.map((product) => (
                <Product
                  key={product.id}
                  data={product}
                />
              ))
              : (
                <Text
                  className="font-body text-slate-400 text-center my-8"
                >
                  Seu carinho está vazio.
                </Text>
              )}


        </View>
        <View
          className="flex-row gap-2 items-center mt-5 mb-4"
        >
          <Text
            className="text-white text-xl font-subtitle"
          >
            Total:
          </Text>
          <Text
            className="text-lime-400 text-2xl font-heading"
          >
            {total}
          </Text>
        </View>
        <Input
          placeholder="Informe o endereço com rua, bairro, cep, número e complemento"
        />
      </ScrollView>
    </View>
  )
}