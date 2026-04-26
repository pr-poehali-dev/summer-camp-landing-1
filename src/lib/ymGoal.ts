declare global {
  interface Window {
    ym?: (counterId: number, action: string, target: string, params?: Record<string, unknown>) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const COUNTER_ID = 108772321;

export function ymGoal(target: string, params?: Record<string, unknown>) {
  try {
    if (typeof window !== "undefined" && typeof window.ym === "function") {
      window.ym(COUNTER_ID, "reachGoal", target, params);
    }
  } catch {
    /* noop */
  }
}

export interface EcommerceProduct {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  category?: string;
  brand?: string;
}

function pushDataLayer(payload: Record<string, unknown>) {
  try {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  } catch {
    /* noop */
  }
}

export function ecommerceDetail(products: EcommerceProduct[]) {
  pushDataLayer({
    ecommerce: {
      currencyCode: "RUB",
      detail: {
        products: products.map((p) => ({ ...p, quantity: p.quantity ?? 1 })),
      },
    },
  });
}

export function ecommerceAddToCart(products: EcommerceProduct[]) {
  pushDataLayer({
    ecommerce: {
      currencyCode: "RUB",
      add: {
        products: products.map((p) => ({ ...p, quantity: p.quantity ?? 1 })),
      },
    },
  });
}

export function ecommercePurchase(orderId: string, products: EcommerceProduct[]) {
  pushDataLayer({
    ecommerce: {
      currencyCode: "RUB",
      purchase: {
        actionField: { id: orderId },
        products: products.map((p) => ({ ...p, quantity: p.quantity ?? 1 })),
      },
    },
  });
}

export default ymGoal;