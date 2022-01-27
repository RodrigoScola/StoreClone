import { async } from "@firebase/util"

const server = require("./server")

export const getProductsFromServer = async () => {
	let prod = await server.fetchData("products/get-all")

	return JSON.parse(prod)
}
const getProduct = async () => {
	const prod = await getProductsFromServer()
	const files = await getFilesfromServer(prod)
	return {
		prod: prod,
		files,
	}
}
const getFromId = async (id, pId) => {
	let prod = await server.fetchData("products/getFromId", { id, pId }).then(res => {
		return JSON.parse(res)
	})
	const files = await getFilesfromServer(prod)

	return {
		prod,
		files,
	}
}
//add an getproduct by id
export const getFilesfromServer = async products => {
	let files = products.map(async value => {
		const file = await server.getFile(value)
		return file
	})
	return await Promise.all(files).then(res => {
		files = [res]
		return files[0]
	})
}
module.exports = { getProductsFromServer, getFilesfromServer, getProduct, getFromId }

const products = [
	{
		name: "frying pan",
		id: "aosidfj",
		quantity: 123,
		price: "19.99",
		badges: ["new", "free shipping"],
		description: "a pan that you can fry your bread on",
		category: "cozinha",
		user: "Rodrigo Scola",
		photos: [
			"https://www.tescomaonline.com/media/images/catalog/item/zoom/pm1_594000__1.jpg",
			"https://www.agacookshop.co.uk/media/catalog/product/cache/47cbbf499c8da766680cb4292e03b0c2/f/r/frying_pan_3.jpg",
			"https://www.pamperedchef.com/iceberg/com/product/2729-2-lg.jpg",
			"https://www.tescomaonline.com/media/images/catalog/item/zoom/pr7_602020__1.jpg",
		],
	},
	{
		name: "bread",
		quantity: 12398,
		price: "2",
		id: "9xcv98xazkwp",
		description: "a bread that you can get fried on your frying pan",
		category: "cozinha",
		user: "azmongold Bold",
		photos: [
			"https://speisekarte.menu/storage/media/dishes_main/1301534/1200px-korb-mit-brc3b6tchen-1531911582.JPG",
			"https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipe%20Ramp%20Up%2F2021-11-Potato-Bread%2Fpotato_bread_01",
			"https://www.thespruceeats.com/thmb/rNuvTaJvXe3BptAYiTM_HKxi_tM=/1333x1000/smart/filters:no_upscale()/easy-honey-white-bread-recipe-428160-hero-01-22ed0bda55f643318b4c658a2c020647.jpg",
			"https://www.kingarthurbaking.com/sites/default/files/2020-02/the-easiest-loaf-of-bread-youll-ever-bake.jpg",
		],
	},
	{
		name: "youtuber",
		quantity: 12,
		price: "9.99",
		badges: ["used"],
		id: "zlxckvub9",
		description: "buy a person",
		category: "Eletronicos",
		user: "JSTATION",
		photos: [
			"https://veja.abril.com.br/wp-content/uploads/2021/05/live.jpg?quality=70&strip=info&w=680&h=453&crop=1",
			"https://www.agacookshop.co.uk/media/catalog/product/cache/47cbbf499c8da766680cb4292e03b0c2/f/r/frying_pan_3.jpg",
			"https://thispersondoesnotexist.com/image",
			"https://istoe.com.br/wp-content/uploads/sites/14/2020/01/youtuber.jpg",
		],
	},
	{
		name: "barbie doll",
		quantity: 0,
		id: "0c9bv80i2m3.",
		badges: ["free shipping"],
		description: "barbie doll",
		category: "brinquedos",
		price: "20.99",
		user: "Rodrigo Scola",
		photos: [
			"https://a-static.mlcdn.com.br/1500x1500/barbie-boneca-feita-para-mexer-made-to-move-loira-mattel/fabricaalegriabrinquedos/10692/6f32ba18abf6679d7809e09e7a981e58.jpg",
			"https://farmaciaindiana.vteximg.com.br/arquivos/ids/240419/27084930696.jpg?v=637595540713100000",
			"https://m.media-amazon.com/images/I/71W7caRX+3L._AC_SL1500_.jpg",
			"https://cf.shopee.com.br/file/7338d4abd1dd1e84f0e7c0c03359db3f",
		],
	},
	{
		name: "frying pan",
		id: "xc9vi-12,fv[",
		quantity: 90834,
		description: "a pan that you can fry your bread on",
		category: "cozinha",
		user: "Rodrigo Scola",
		photos: [
			"https://www.tescomaonline.com/media/images/catalog/item/zoom/pm1_594000__1.jpg",
			"https://www.agacookshop.co.uk/media/catalog/product/cache/47cbbf499c8da766680cb4292e03b0c2/f/r/frying_pan_3.jpg",
			"https://www.pamperedchef.com/iceberg/com/product/2729-2-lg.jpg",
			"https://www.tescomaonline.com/media/images/catalog/item/zoom/pr7_602020__1.jpg",
		],
	},
	{
		name: "robot",
		id: "xcpvoixpivzvpcxo",
		quantity: 50,
		description: "ribbit ribbit birrit",
		category: "eletronicos",
		user: "Rodrigo Scola",
		photos: [
			"https://media.istockphoto.com/photos/little-robot-waving-hand-cute-robot-isolated-on-white-background-3d-picture-id1250677553?k=20&m=1250677553&s=170667a&w=0&h=bp1jmhQnsoto6npuqHARe9z5UkZIaF560ScMmxi9CSo=",
			"https://i.insider.com/61aa489d5d47cc0018e93cc1?width=1136&format=jpeg",
			"https://www.pamperedchef.com/iceberg/com/product/2729-2-lg.jpg",
			"https://media.gettyimages.com/photos/artificial-intelligence-robot-picture-id1197242566?s=612x612",
		],
	},
	{
		name: "frying pan",
		id: "pxcvocovi",
		quantity: 90,
		badges: ["new", "free shipping"],
		description: "brobot robot ocinemammemeshahaa",
		category: "eletronicos",
		user: "Rodrigo Scola",
		photos: [
			"https://static.generation-robots.com/13385-product_cover/alpha-mini-humanoid-educational-robot.jpg",
			"https://static.educalingo.com/img/fr/800/robot.jpg",
			"https://pal-robotics.com/wp-content/uploads/2019/05/reem-c_foto.jpg",
			"https://upload.wikimedia.org/wikipedia/commons/0/05/HONDA_ASIMO.jpg",
		],
	},
	{
		name: "frying pan",
		id: "9xcvi0iwenvp",
		quantity: 12,
		price: "20.99",
		badges: ["new", "free shipping"],
		description: "a pan that you can fry your bread on",
		category: "cozinha",
		user: "Rodrigo Scola",
		photos: [
			"https://www.tescomaonline.com/media/images/catalog/item/zoom/pm1_594000__1.jpg",
			"https://www.agacookshop.co.uk/media/catalog/product/cache/47cbbf499c8da766680cb4292e03b0c2/f/r/frying_pan_3.jpg",
			"https://www.pamperedchef.com/iceberg/com/product/2729-2-lg.jpg",
			"https://www.tescomaonline.com/media/images/catalog/item/zoom/pr7_602020__1.jpg",
		],
	},
]
