import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// ============= INTERFACES =============

export interface Products {
  productId: string
  name: string
  costPrice: number
  price: number
  stockQuantity: number
  purchases?: Purchase[]
  sales?: Sale[]
}

export interface NewProduct {
  name: string
  costPrice: number
  price: number
  stockQuantity?: number
}

export interface UpdateProduct {
  name?: string
  costPrice?: number
  price?: number
  stockQuantity?: number
}

export interface Purchase {
  purchaseId: string
  productId: string
  quantity: number
  unitCost: number
  totalCost: number
  createdAt: string
  product?: Products
}

export interface NewPurchase {
  productId: string
  quantity: number
  unitCost: number
  totalCost: number
}

export interface UpdatePurchase {
  productId?: string
  quantity?: number
  unitCost?: number
  totalCost?: number
}

export interface Customer {
  customerId: string
  name: string
  phone?: string
  address?: string
  sales?: Sale[]
}

export interface NewCustomer {
  name: string
  phone?: string
  address?: string
}

export interface UpdateCustomer {
  name?: string
  phone?: string
  address?: string
}

export interface Sale {
  saleId: string
  productId: string
  customerId: string
  quantity: number
  unitPrice: number
  totalAmount: number
  profit: number
  createdAt: string
  product?: Products
  customer?: Customer
}

export interface NewSale {
  productId: string
  customerId: string
  quantity: number
  unitPrice: number
  totalAmount: number
  profit: number
}

export interface UpdateSale {
  productId?: string
  customerId?: string
  quantity?: number
  unitPrice?: number
  totalAmount?: number
  profit?: number
}

// ============= SUMMARY INTERFACES (GET ONLY) =============

export interface SalesSummary {
  id: string
  totalRevenue: number
  totalProfit: number
  salesCount: number
  changePercent?: number
  createdAt: string
}

export interface InventorySummary {
  id: string
  totalProducts: number
  stockValue: number
  lowStockItems: number
  createdAt: string
}

export interface CustomerSummary {
  id: string
  totalCustomers: number
  newCustomers: number
  repeatCustomers: number
  changePercent?: number
  createdAt: string
}

export interface DashboardMetrics {
  salesSummary: SalesSummary[]
  inventorySummary: InventorySummary[]
  customerSummary: CustomerSummary[]
  topProducts: Products[]
  recentSales: Sale[]
  recentPurchases: Purchase[]
}

// ============= API DEFINITION =============

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "/api" }),
  reducerPath: "api",
  tagTypes: [
    "DashboardMetrics",
    "Products",
    "Purchase",
    "Customer",
    "Sale",
    "SalesSummary",
    "InventorySummary",
    "CustomerSummary",
  ],
  endpoints: (build) => ({
    // ============= DASHBOARD ENDPOINTS =============
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),

    // ============= PRODUCTS ENDPOINTS =============
    getProducts: build.query<Products[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
    }),
    getProductById: build.query<Products, string>({
      query: (id) => `/products/${id}`,
      providesTags: ["Products"],
    }),
    createProduct: build.mutation<Products, NewProduct>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: build.mutation<Products, { id: string; data: UpdateProduct }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: build.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    // ============= PURCHASE ENDPOINTS =============
    getPurchases: build.query<Purchase[], void>({
      query: () => "/purchases",
      providesTags: ["Purchase"],
    }),
    getPurchaseById: build.query<Purchase, string>({
      query: (id) => `/purchases/${id}`,
      providesTags: ["Purchase"],
    }),
    createPurchase: build.mutation<Purchase, NewPurchase>({
      query: (newPurchase) => ({
        url: "/purchases",
        method: "POST",
        body: newPurchase,
      }),
      invalidatesTags: ["Purchase", "Products", "DashboardMetrics"],
    }),
    updatePurchase: build.mutation<Purchase, { id: string; data: UpdatePurchase }>({
      query: ({ id, data }) => ({
        url: `/purchases/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Purchase", "Products", "DashboardMetrics"],
    }),
    deletePurchase: build.mutation<void, string>({
      query: (id) => ({
        url: `/purchases/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Purchase", "Products", "DashboardMetrics"],
    }),

    // ============= CUSTOMER ENDPOINTS =============
    getCustomers: build.query<Customer[], string | void>({
      query: (search) => ({
        url: "/customers",
        params: search ? { search } : {},
      }),
      providesTags: ["Customer"],
    }),
    getCustomerById: build.query<Customer, string>({
      query: (id) => `/customers/${id}`,
      providesTags: ["Customer"],
    }),
    createCustomer: build.mutation<Customer, NewCustomer>({
      query: (newCustomer) => ({
        url: "/customers",
        method: "POST",
        body: newCustomer,
      }),
      invalidatesTags: ["Customer"],
    }),
    updateCustomer: build.mutation<Customer, { id: string; data: UpdateCustomer }>({
      query: ({ id, data }) => ({
        url: `/customers/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Customer"],
    }),
    deleteCustomer: build.mutation<void, string>({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customer"],
    }),

    // ============= SALE ENDPOINTS =============
    getSales: build.query<Sale[], void>({
      query: () => "/sales",
      providesTags: ["Sale"],
    }),
    getSaleById: build.query<Sale, string>({
      query: (id) => `/sales/${id}`,
      providesTags: ["Sale"],
    }),
    createSale: build.mutation<Sale, NewSale>({
      query: (newSale) => ({
        url: "/sales",
        method: "POST",
        body: newSale,
      }),
      invalidatesTags: ["Sale", "Products", "DashboardMetrics"],
    }),
    updateSale: build.mutation<Sale, { id: string; data: UpdateSale }>({
      query: ({ id, data }) => ({
        url: `/sales/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Sale", "Products", "DashboardMetrics"],
    }),
    deleteSale: build.mutation<void, string>({
      query: (id) => ({
        url: `/sales/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sale", "Products", "DashboardMetrics"],
    }),

    // ============= SUMMARY ENDPOINTS (GET ONLY) =============
    getSalesSummary: build.query<SalesSummary[], void>({
      query: () => "/summary/sales",
      providesTags: ["SalesSummary"],
    }),
    getInventorySummary: build.query<InventorySummary[], void>({
      query: () => "/summary/inventory",
      providesTags: ["InventorySummary"],
    }),
    getCustomerSummary: build.query<CustomerSummary[], void>({
      query: () => "/summary/customers",
      providesTags: ["CustomerSummary"],
    }),
  }),
})

// ============= EXPORT HOOKS =============
export const {
  // Dashboard
  useGetDashboardMetricsQuery,

  // Products
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,

  // Purchases
  useGetPurchasesQuery,
  useGetPurchaseByIdQuery,
  useCreatePurchaseMutation,
  useUpdatePurchaseMutation,
  useDeletePurchaseMutation,

  // Customers
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,

  // Sales
  useGetSalesQuery,
  useGetSaleByIdQuery,
  useCreateSaleMutation,
  useUpdateSaleMutation,
  useDeleteSaleMutation,

  // Summary (GET only)
  useGetSalesSummaryQuery,
  useGetInventorySummaryQuery,
  useGetCustomerSummaryQuery,
} = api
