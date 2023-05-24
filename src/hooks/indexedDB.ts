
type ObjectStore = IDBObjectStore | undefined;
export async function connectDB(): Promise<ObjectStore> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open('indexdb', 1);

		request.onsuccess = () => {
			const db = request.result;
			if (!db.objectStoreNames.contains('products')) {
				const tx = db.transaction(['products'], 'readwrite');
				const products = tx.objectStore('products');
				resolve(products);
			} else {
				const tx = db.transaction(['products'], 'readwrite');
				const products = tx.objectStore('products');
				resolve(products);
			}
		};

		request.onerror = () => {
			console.error("Error", request.error);
			reject(request.error);
		};

		request.onupgradeneeded = () => {
			const db = request.result;
			if (!db.objectStoreNames.contains('products')) {
				const products = db.createObjectStore('products', { keyPath: 'id' });
				resolve(products);
			} else {
				const tx = db.transaction(['products'], 'readwrite');
				const products = tx.objectStore('products');
				resolve(products);
			}
		};
	});
}

export async function addToDB(object: any): Promise<void> {
	const db = await connectDB(); // Подключаемся к IndexedDB

	if (db) {
		const request = db.add(object); // Добавляем объект в хранилище

		request.onsuccess = () => {
			console.log('Object added to IndexedDB');
		};

		request.onerror = () => {
			console.error('Error adding object to IndexedDB', request.error);
		};
	} else {
		console.error('Unable to connect to IndexedDB');
	}
}


export async function getFromDB(id: number): Promise<any | undefined> {
	const db = await connectDB(); // Подключаемся к IndexedDB

	if (db) {
		const request = db.get(id); // Получаем объект по идентификатору

		return new Promise((resolve, reject) => {
			request.onsuccess = () => {
				const result = request.result;
				resolve(result);
			};

			request.onerror = () => {
				console.error('Error getting object from IndexedDB', request.error);
				reject(request.error);
			};
		});
	} else {
		console.error('Unable to connect to IndexedDB');
		return undefined;
	}
}

export async function getAllFromDB(): Promise<any | undefined> {
	const db = await connectDB(); // Подключаемся к IndexedDB

	if (db) {
		const request = db.getAll(); // Получаем объект по идентификатору

		return new Promise((resolve, reject) => {
			request.onsuccess = () => {
				const result = request.result;
				resolve(result);
			};

			request.onerror = () => {
				console.error('Error getting object from IndexedDB', request.error);
				reject(request.error);
			};
		});
	} else {
		console.error('Unable to connect to IndexedDB');
		return undefined;
	}
}

export async function deleteFromDB(id: number): Promise<any | undefined> {
	const db = await connectDB(); // Подключаемся к IndexedDB

	if (db) {
		const request = db.delete(id); // Получаем объект по идентификатору

		return new Promise((reject) => {
			request.onsuccess = () => {
				console.log('Successully deleted Offer with id', id)
			};

			request.onerror = () => {
				console.error('Error deleting object from IndexedDB', request.error);
				reject(request.error);
			};
		});
	} else {
		console.error('Unable to connect to IndexedDB');
		return undefined;
	}
}