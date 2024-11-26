import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../common/Input";
import Button from "../common/Button";
import AddressSection from "./AddressSection";
import ItemsSection from "./ItemsSection";
import PaymentTerms from "./PaymentTerms";
import invoiceSchema from "../../schemas/invoiceSchema";
import { createInvoice } from "../../services/invoicesService";

const InvoiceForm = ({ onFormClose }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
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
          quantity: 0,
          price: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control,
  });

  const { mutate, isPending, isError, error } = createInvoice();

  const handleSave = (data, status) => {
    const payload = { ...data, status };
    console.log(payload);
    try {
      mutate(payload);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data) => {
    handleSave(data, "Pending");
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
            <AddressSection
              errors={errors}
              register={register}
              baseId="senderAddress"
            />
          </div>
          <div className="mt-10 space-y-6">
            <p className="font-semibold text-blue-500">Bill To</p>
            <Input
              register={register}
              errors={errors?.clientName}
              label="Client's Name"
              id="clientName"
            />
            <Input
              register={register}
              errors={errors?.clientEmail}
              type="email"
              label="Client's Email"
              id="clientEmail"
            />
            <AddressSection
              errors={errors}
              register={register}
              baseId="clientAddress"
            />
            <PaymentTerms
              label="Payment Terms"
              id="paymentTerms"
              errors={errors?.paymentTerms}
              register={register}
            />
            <Input
              errors={errors?.description}
              register={register}
              label="Project Description"
              id="description"
            />
          </div>
          <ItemsSection
            fields={fields}
            append={append}
            remove={remove}
            register={register}
            errors={errors}
          />

          <div className="sticky bottom-0 left-0 right-0 w-full  z-20 bg-white drop-shadow-[0_-5px_100px_rgba(0,0,0,0.3)] flex items-center justify-end py-6 px-2 space-x-2 mt-40 ">
            <Button
              onClick={() => reset()}
              className="text-blue-700 rounded-xl bg-gray-200 hover:text-white hover:bg-gray-800 focus:bg-gray-800"
            >
              Discard
            </Button>
            <Button
              disabled={isPending}
              onClick={handleSubmit((data) => handleSave(data, "Draft"))}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:bg-gray-900 dark:bg-white dark:text-neutral-800 rounded-xl"
            >
              Save as Draft
            </Button>
            <Button
              disabled={isPending}
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
