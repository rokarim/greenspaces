require 'rails_helper'

RSpec.describe Review, type: :model do
  it { should have_valid(:title).when("Best Park Ever") }
  it { should_not have_valid(:title).when(nil,"") }

  it { should have_valid(:body).when("This superdooper amazing park is really truly the most wonderful park in the universe.") }
  it { should_not have_valid(:body).when("Best park evah", nil,"") }

  it { should have_valid(:rating).when("5") }
  it { should_not have_valid(:rating).when(nil,"", "banana", "10") }
end
