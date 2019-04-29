class CreateNeighborhoods < ActiveRecord::Migration[5.2]
  def change
    create_table :neighborhoods do |t|
      t.string :name, null: false, unique: true

      t.timestamps
    end

    change_table :green_spaces do |t|
      t.belongs_to :neighborhood, null: false
    end
  end
end
