# entertainme

# Week-2 Day 4

## Kamis Pagi

kerjakan di folder `server/monolith`

## Kamis Siang

pisahkan app yang kalian buat tadi pagi menjadi arsitektur microservice:

1. orchestrator: kerjakan di folder `server/orchestrator-express` berupa aplikasi express.js PORT 4000
2. service movies: kerjakan di folder `server/services/movies` berupa aplikasi express.js PORT 4001
3. service tvseries: kerjakan di folder `server/services/tvseries` berupa aplikasi express.js PORT 4002

# Week-2 Day 5

## Jumat Pagi:

1. kerjakan di folder `server/orchestrator`, aplikasi berupa apollo server (atau digabung dengan express) PORT 4000
2. service movies: `server/services/movies` berupa aplikasi express.js PORT 4001
3. service tvseries: `server/services/tvseries` berupa aplikasi express.js PORT 4002

## Jumat Siang

kerjakan di folder `client`, aplikasi berupa react + apollo client

## Sabtu

**Pengumpulan Server Entertainme**, `add-commit-push-pullrequest` paling lambat jam 23.59

## Week-3

lanjut kerjakan di folder client

## Folder Structure

- client
- server
  - monolith
  - orchestrator-express
  - orchestrator
  - services
    - movies
    - tvseries

## Checklist

### MongoDB services

- [x] Membuat aplikasi server menggunakan express.js berisikan API untuk CRUD data movies menggunakan database mongoDB, dengan ketentuan skema sebagai berikut:
  - title: String
  - overview: String
  - poster_path: String
  - popularity: Double
  - tags: Array
- [x] Membuat aplikasi server menggunakan express.js berisikan API untuk CRUD data tvseries menggunakan database mongoDB, dengan ketentuan skema sebagai berikut:
  - title: String
  - overview: String
  - poster_path: String
    - popularity: Double
    - tags: Array

### Orchestrator with GraphQL

- [x] Membuat orchestator dengan menggunakan Apollo Server serta mengimplementasikan Query dan Mutation
- [x] Implementasikan Redis sebagai cache untuk meminimalisir jumlah request ke database ketika Read Data
- [x] Melakukan cache invalidation ketika ada data yang berubah ketika melakukan Create, Update, Delete

### GraphQL Client

- [ ] Membuat client side untuk menampilkan menggunakan Apollo Client.
- [ ] Buat halaman home yang menampilkan data movies dan tvseries dengan menggunakan 1 query GraphQL
- [ ] Buat halaman/modal Create & Update untuk movies di client dengan memanfaatkan query dan mutation
- [ ] Buat fitur delete untuk movie menggunakan mutation
- [ ] Buat fitur & halaman favorites dengan menggunakan localState (reactive variables / apollo cache) dan dapat memasukkan movie/tvseries kedalam favorites

### Rocket (pilih salah satu)

- [ ] Buatlah Custom Component mengganti Modal yang kamu pakai. Custom Component ini dipakai disemua pages kalian untuk validasi pada saat create, edit dan delete. (intinya bikin sweetalert/modal secara manual tanpa menggunakan library/css framework apapun) & Custom Component untuk menghandle preload.
- [ ] Buat Docker Image untuk orchestrator dan masing-masing services
- [ ] Deploy Client dan Server menggunakan AWS S3 dna EC2
