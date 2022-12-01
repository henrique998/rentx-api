-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_rentals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "car_id" TEXT,
    "account_id" TEXT,
    "start_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" DATETIME,
    "expected_return_date" DATETIME NOT NULL,
    "total" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "rentals_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "rentals_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_rentals" ("account_id", "car_id", "created_at", "end_date", "expected_return_date", "id", "start_date", "total", "updated_at") SELECT "account_id", "car_id", "created_at", "end_date", "expected_return_date", "id", "start_date", "total", "updated_at" FROM "rentals";
DROP TABLE "rentals";
ALTER TABLE "new_rentals" RENAME TO "rentals";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
