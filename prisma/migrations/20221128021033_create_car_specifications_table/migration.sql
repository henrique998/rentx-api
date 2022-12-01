-- CreateTable
CREATE TABLE "car_specifications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "car_id" TEXT,
    "specification_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "car_specifications_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "car_specifications_specification_id_fkey" FOREIGN KEY ("specification_id") REFERENCES "specifications" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
