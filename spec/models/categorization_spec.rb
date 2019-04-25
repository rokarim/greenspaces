require 'rails_helper'

RSpec.describe Categorization, type: :model do
  it { should have_valid(:feature_id).when("1") }
  it { should_not have_valid(:feature_id).when(nil,"") }
  it { should have_valid(:green_space_id).when("5") }
  it { should_not have_valid(:green_space_id).when(nil,"") }
end
