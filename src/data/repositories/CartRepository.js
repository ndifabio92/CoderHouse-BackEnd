import CartSchema from "../models/cartSchema.js";
import CartEntity from "../../domain/entities/CartEntity.js";

class CartRepository {
    async getOne(id) {
        try {
            const document = await CartSchema.findById(id).populate('products.id');
            if (!document) return null;
            return new CartEntity({
                id: document._id,
                products: document.products
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    async create(data) {
        try {
            const document = await CartSchema.create(data);
            return {
                id: document._id,
                products: document.products.map(item => {
                    return {
                        id: item._id,
                        quantity: item.quantity
                    }
                })
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    async insert(cid, body) {
        try {
            const document = await CartSchema.findOneAndUpdate({_id: cid}, body, {new: true});

            return {
                id: document._id,
                products: document.products.map(item => {
                    return {
                        id: item._id,
                        quantity: item.quantity
                    }
                })
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    async delete(id, cart) {
        try {
            const document = await CartSchema.findByIdAndUpdate({_id: id}, cart, {new: true});
            return {
                id: document._id
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    async deleteItem(cid, newProducts) {
        try {
            const document = await CartSchema.findByIdAndUpdate({_id: cid}, newProducts, {new: true});
            return {
                id: document._id,
                products: document.products.map(item => {
                    return {
                        id: item._id,
                        quantity: item.quantity
                    }
                })
            };
        } catch (error) {
            throw error;
        }
    };

    async updateItem(cid, cart) {
        try {
            const document = await CartSchema.findByIdAndUpdate({_id: cid}, cart, {new: true})
            return {
                id: document._id,
                products: document.products.map(item => {
                    return {
                        id: item._id,
                        quantity: item.quantity
                    }
                })
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    async updateProducts(cid, body) {
        try {
            const document = await CartSchema.findByIdAndUpdate({_id: cid}, body, {new: true});
            return {
                id: document._id,
                products: document.products.map(item => {
                    return {
                        id: item._id,
                        quantity: item.quantity
                    }
                })
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
}

export default CartRepository;