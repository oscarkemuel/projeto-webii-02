import BadRequestException from 'App/Exceptions/BadRequestException'
import Product from 'App/Models/Product'

interface ProductInterface {
  name: string
  description: string
  price: number
  category: string
  quantity: number
  storeId?: number
}

class ProductService {
  public async getAll() {
    const products = await Product.all()

    return products
  }

  public async createProduct(data: ProductInterface) {
    const product = await Product.create({ ...data })

    return product
  }

  public async getProductById(id: number) {
    const product = await Product.findBy('id', id)

    if (!product) throw new BadRequestException('Product not found', 404)

    await product.load('store')

    return product
  }

  public async updateProduct(id: number, data: ProductInterface) {
    const product = await Product.findBy('id', id)

    if (!product) throw new BadRequestException('Product not found', 404)

    product.merge(data)
    await product.save()

    return product
  }

  public async deleteProduct(id: number) {
    const product = await Product.findBy('id', id)

    if (!product) throw new BadRequestException('Product not found', 404)

    await product.delete()
  }
}

export default ProductService
