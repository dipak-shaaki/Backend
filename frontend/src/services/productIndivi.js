const APP_URL = import.meta.env.VITE_API_URL
const getIndiviProduct = async (productId) => {
    try {
        const response = await fetch(`${APP_URL}/products/${productId}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error occur while fetching the individual product:', error)
    }
}

export { getIndiviProduct }