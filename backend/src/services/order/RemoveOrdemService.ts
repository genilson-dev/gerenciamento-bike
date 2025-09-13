// import { prismaDB } from "../../prisma";
// import { OrderRequest } from "../../interfaces/OrderRequest";

// class RemoverOrderService{
//     async execute({order_id}:OrderRequest){
//         const order = await prismaDB.order.delete({
//             where:{
//                 id: order_id
//             },
//             select: {
//                 id: true
//             }
//         })
//         return order
//     }
// }

// export {RemoverOrderService}
