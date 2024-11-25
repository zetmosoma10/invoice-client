import Button from "../common/Button";
import Input from "../common/Input";

const ItemsSection = ({ fields, remove, append, errors, register }) => {
  return (
    <div className="mt-10 space-y-6">
      <p className="font-semibold text-blue-500">Item List</p>
      <div>
        {fields.map((field, index) => (
          <div key={field.id} className="grid gap-6 md:grid-cols-2 mb-6">
            <Input
              label="Item Name"
              id={`items.${index}.name`}
              register={register}
              errors={errors}
            />
            <div className="grid grid-cols-3 gap-2">
              <Input
                label="Qty."
                id={`items.${index}.quantity`}
                register={register}
                errors={errors}
              />
              <Input
                label="Price"
                id={`items.${index}.price`}
                register={register}
                errors={errors}
              />
              {index > 0 && (
                <svg
                  onClick={() => remove(index)}
                  className=" self-center cursor-pointer"
                  width="13"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="transition-all fill-gray-400 hover:fill-red-500 focus:fill-red-500"
                    d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                    fill="#888EB0"
                    fillRule="nonzero"
                  />
                </svg>
              )}
            </div>
          </div>
        ))}
        <Button
          onClick={() => append({ name: "", quantity: "", price: "" })}
          className="w-full rounded-3xl active:scale-95 text-center text-blue-700 bg-gray-200 hover:text-white hover:bg-gray-800 focus:bg-gray-800"
        >
          + Add New Item
        </Button>
      </div>
    </div>
  );
};

export default ItemsSection;
