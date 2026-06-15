export type AccountOrderStatus =
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface AccountOrderLine {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface AccountOrder {
  id: string;
  orderNumber: string;
  status: AccountOrderStatus;
  placedAt: string;
  total: number;
  items: AccountOrderLine[];
}

export interface AccountWishlistItem {
  id: string;
  productId: string;
  name: string;
  image?: string;
  addedAt: string;
}

export interface AccountReview {
  id: string;
  productId: string;
  productName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AccountDashboardData {
  orders: AccountOrder[];
  wishlist: AccountWishlistItem[];
  reviews: AccountReview[];
}

export const emptyAccountDashboardData: AccountDashboardData = {
  orders: [],
  wishlist: [],
  reviews: [],
};

const STORAGE_PREFIX = "account";

const buildKey = (userId: string, segment: string) =>
  `${STORAGE_PREFIX}:${userId}:${segment}`;

const isRecord = (
  value: unknown
): value is Record<string, unknown> =>
  typeof value === "object" &&
  value !== null &&
  !Array.isArray(value);

const asString = (
  value: unknown,
  fallback = ""
) =>
  typeof value === "string" &&
  value.trim().length > 0
    ? value.trim()
    : fallback;

const asNumber = (
  value: unknown,
  fallback = 0
) => {
  const parsed =
    typeof value === "number"
      ? value
      : Number(value);

  return Number.isFinite(parsed)
    ? parsed
    : fallback;
};

const readArray = (
  key: string
): unknown[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const storedValue =
    window.localStorage.getItem(key);

  if (!storedValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(storedValue);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
};

const normalizeOrderStatus = (
  value: unknown
): AccountOrderStatus => {
  if (
    value === "Processing" ||
    value === "Shipped" ||
    value === "Delivered" ||
    value === "Cancelled"
  ) {
    return value;
  }

  return "Processing";
};

const normalizeOrderItem = (
  value: unknown,
  index: number
): AccountOrderLine | null => {
  if (!isRecord(value)) {
    return null;
  }

  const productId = asString(
    value.productId,
    asString(value.id, "")
  );
  const name = asString(value.name, "");

  if (!productId && !name) {
    return null;
  }

  return {
    productId: productId || `item-${index}`,
    name: name || "Item",
    quantity: Math.max(
      1,
      Math.floor(asNumber(value.quantity, 1))
    ),
    price: asNumber(value.price, 0),
  };
};

const normalizeOrder = (
  value: unknown,
  index: number
): AccountOrder | null => {
  if (!isRecord(value)) {
    return null;
  }

  const items = Array.isArray(value.items)
    ? value.items
        .map((item, itemIndex) =>
          normalizeOrderItem(item, itemIndex)
        )
        .filter(
          (
            item
          ): item is AccountOrderLine =>
            item !== null
        )
    : [];

  const id = asString(
    value.id,
    `order-${index + 1}`
  );

  return {
    id,
    orderNumber: asString(
      value.orderNumber,
      id
    ),
    status: normalizeOrderStatus(
      value.status
    ),
    placedAt: asString(
      value.placedAt,
      ""
    ),
    total: asNumber(
      value.total,
      items.reduce(
        (sum, item) =>
          sum + item.price * item.quantity,
        0
      )
    ),
    items,
  };
};

const normalizeWishlistItem = (
  value: unknown,
  index: number
): AccountWishlistItem | null => {
  if (!isRecord(value)) {
    return null;
  }

  const productId = asString(
    value.productId,
    asString(value.id, "")
  );
  const name = asString(value.name, "");

  if (!productId && !name) {
    return null;
  }

  const id = asString(
    value.id,
    `wishlist-${index + 1}`
  );

  return {
    id,
    productId: productId || id,
    name: name || "Saved item",
    image: asString(
      value.image,
      ""
    ) || undefined,
    addedAt: asString(
      value.addedAt,
      ""
    ),
  };
};

const normalizeReview = (
  value: unknown,
  index: number
): AccountReview | null => {
  if (!isRecord(value)) {
    return null;
  }

  const productId = asString(
    value.productId,
    asString(value.id, "")
  );
  const productName = asString(
    value.productName,
    asString(value.name, "")
  );
  const rating = Math.max(
    1,
    Math.min(5, Math.round(asNumber(value.rating, 0)))
  );

  if (!productId && !productName) {
    return null;
  }

  const id = asString(
    value.id,
    `review-${index + 1}`
  );

  return {
    id,
    productId: productId || id,
    productName: productName || "Product",
    rating,
    comment: asString(
      value.comment,
      ""
    ),
    createdAt: asString(
      value.createdAt,
      ""
    ),
  };
};

const readCollection = <T>(
  key: string,
  normalizer: (
    value: unknown,
    index: number
  ) => T | null
) =>
  readArray(key)
    .map((item, index) =>
      normalizer(item, index)
    )
    .filter((item): item is T => item !== null);

export const readAccountDashboardData = (
  userId: string
): AccountDashboardData => ({
  orders: readCollection(
    buildKey(userId, "orders"),
    normalizeOrder
  ),
  wishlist: readCollection(
    buildKey(userId, "wishlist"),
    normalizeWishlistItem
  ),
  reviews: readCollection(
    buildKey(userId, "reviews"),
    normalizeReview
  ),
});
