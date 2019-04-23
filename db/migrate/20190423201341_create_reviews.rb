class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.string :title, null: false
      t.integer :rating, null: false
      t.text :body, null: false
      t.belongs_to :user
      t.belongs_to :green_space

      t.timestamps
    end
  end
end
