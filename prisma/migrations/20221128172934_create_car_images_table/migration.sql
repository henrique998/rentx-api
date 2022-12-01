-- CreateTable
CREATE TABLE "car_images" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "car_id" TEXT,
    "image_url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "car_images_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
