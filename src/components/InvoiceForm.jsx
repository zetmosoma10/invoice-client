import { useForm, useFieldArray } from "react-hook-form";
import Input from "./common/Input";
import Button from "./common/Button";

const InvoiceForm = ({ onFormClose }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "",
      clientName: "",
      clientEmail: "",
      paymentTerms: "",
      description: "",
      senderAddress: {
        street: "",
        city: "",
        postalCode: "",
        country: "",
      },
      clientAddress: {
        street: "",
        city: "",
        postalCode: "",
        country: "",
      },
      items: [
        {
          name: "",
          quantity: "",
          price: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control,
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section className="z-10 absolute top-0 bottom-0 left-0 w-full min-h-screen bg-gray-950 bg-opacity-15">
      <div className="overflow-y-scroll  bg-white pt-8 px-6 absolute top-0 left-0 bottom-0 h-screen w-full md:w-[75%] lg:w-[60%]">
        <button
          onClick={onFormClose}
          className="flex items-center text-base font-semibold text-gray-500 gap-x-2 hover:underline"
        >
          <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.342.886L2.114 5.114l4.228 4.228"
              stroke="#9277FF"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
          <span>Go back</span>
        </button>
        <h4 className="text-2xl font-bold mt-6 leading-[-0.5px] text-gray-950">
          New Invoice
        </h4>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          <div className="space-y-6">
            <p className="font-semibold text-blue-500">Bill From</p>
            <Input
              register={register}
              errors={errors}
              label="Street Address"
              id="senderAddress.street"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <Input
                register={register}
                errors={errors}
                label="City"
                id="senderAddress.city"
              />
              <Input
                register={register}
                errors={errors}
                label="Post Code"
                id="senderAddress.postalCode"
              />
              <div className="col-span-2 md:col-span-1">
                <Input
                  register={register}
                  errors={errors}
                  label="Country"
                  id="senderAddress.country"
                />
              </div>
            </div>
          </div>
          <div className="mt-10 space-y-6">
            <p className="font-semibold text-blue-500">Bill To</p>
            <Input
              register={register}
              errors={errors}
              label="Client's Name"
              id="clientName"
            />
            <Input
              register={register}
              errors={errors}
              type="email"
              label="Client's Email"
              id="clientEmail"
            />
            <Input
              register={register}
              errors={errors}
              label="Street Address"
              id="clientAddress.street"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <Input
                register={register}
                errors={errors}
                label="City"
                id="clientAddress.city"
              />
              <Input
                register={register}
                errors={errors}
                label="Post Code"
                id="clientAddress.postalCode"
              />
              <div className="col-span-2 md:col-span-1">
                <Input
                  register={register}
                  errors={errors}
                  label="Country"
                  id="clientAddress.country"
                />
              </div>
            </div>
            <div className="grid gap-6">
              <div className="space-y-2">
                <label htmlFor="paymentTerms" className="text-sm">
                  Payment Terms
                </label>
                <select
                  {...register("paymentTerms")}
                  id="paymentTerms"
                  className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                >
                  <option value="Next 1 day">Net 1 day</option>
                  <option value="Next 7 days">Net 7 days</option>
                </select>
              </div>
            </div>
            <Input
              errors={errors}
              register={register}
              label="Project Description"
              id="description"
            />
          </div>
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
          <div className="sticky bottom-0 left-0 right-0 w-full  z-20 bg-white drop-shadow-[0_-5px_100px_rgba(0,0,0,0.3)] flex items-center justify-end py-6 px-2 space-x-2 mt-40 ">
            <Button className="text-blue-700 rounded-xl bg-gray-200 hover:text-white hover:bg-gray-800 focus:bg-gray-800">
              Discard
            </Button>
            <Button className="text-white bg-gray-800 hover:bg-gray-900 focus:bg-gray-900 dark:bg-white dark:text-neutral-800 rounded-xl">
              Save as Draft
            </Button>
            <Button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 rounded-xl"
            >
              Save & Send
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default InvoiceForm;
