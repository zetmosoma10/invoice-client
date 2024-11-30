import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import Input from "../common/Input";
import Button from "../common/Button";
import AddressSection from "./AddressSection";
import ItemsSection from "./ItemsSection";
import PaymentTerms from "./PaymentTerms";
import invoiceSchema from "../../schemas/invoiceSchema";
import { createInvoice, updateInvoice } from "../../services/invoicesService";
import { motion } from "motion/react";

const InvoiceForm = ({ onFormClose, invoice }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      clientName: invoice?.clientName || "",
      clientEmail: invoice?.clientEmail || "",
      paymentTerms: invoice?.paymentTerms || "",
      description: invoice?.description || "",
      senderAddress: {
        street: invoice?.senderAddress.street || "",
        city: invoice?.senderAddress.city || "",
        postalCode: invoice?.senderAddress.postalCode || "",
        country: invoice?.senderAddress.country || "",
      },
      clientAddress: {
        street: invoice?.clientAddress.street || "",
        city: invoice?.clientAddress.city || "",
        postalCode: invoice?.clientAddress.postalCode || "",
        country: invoice?.clientAddress.country || "",
      },
      items: invoice?.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })) || [
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

  const {
    mutate: createMutation,
    isPending: isCreatePending,
    isError: isCreateError,
    error: createError,
  } = createInvoice();

  const {
    mutate: updateMutation,
    isPending: isUpdatePending,
    isError: isUpdateError,
    error: updateError,
  } = updateInvoice();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onFormClose();
    }
  };

  const handleUpdate = (data) => {
    const payload = { ...invoice, ...data };
    updateMutation(payload, {
      onSuccess: () => {
        onFormClose();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleSave = (data, status) => {
    const payload = { ...data, status };
    createMutation(payload, {
      onSuccess: () => {
        onFormClose();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const onSubmit = (data) => {
    handleSave(data, "Pending");
  };

  const onCancel = () => {
    reset();
    onFormClose();
  };

  return (
    <section
      onClick={handleOverlayClick}
      className="absolute top-0 bottom-0 left-0 z-10 w-full min-h-screen bg-gray-950 bg-opacity-15"
    >
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3 }}
        className="overflow-y-scroll  bg-white dark:bg-neutral-800 pt-8 px-6 absolute top-0 left-0 bottom-0 h-screen w-full md:w-[75%] lg:w-[60%]"
      >
        <button
          onClick={onFormClose}
          className="flex items-center text-base font-semibold text-gray-500 dark:text-neutral-500 gap-x-2 hover:underline"
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
        <h4 className="text-2xl font-bold mt-6 leading-[-0.5px] text-gray-950 dark:text-neutral-200">
          {invoice?.clientName ? (
            <span>
              Edit <span className="text-blue-500">#</span>
              {invoice?.invoiceNumber.toUpperCase()}
            </span>
          ) : (
            "New Invoice"
          )}
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

          {isCreateError ? (
            <p className="my-3 text-red-500">
              {createError.response.data.message}
            </p>
          ) : null}

          {isUpdateError ? (
            <p className="my-3 text-red-500">
              {updateError.response.data.message}
            </p>
          ) : null}

          <div className="sticky bottom-0 left-0 right-0 w-full  z-20 bg-white dark:bg-neutral-800 drop-shadow-[0_-5px_100px_rgba(0,0,0,0.3)] flex items-center justify-end py-6 px-2 space-x-2 mt-40 ">
            {invoice?.clientName ? (
              <>
                <Button
                  onClick={onCancel}
                  className="text-blue-700 bg-gray-200 rounded-xl hover:text-white active:text-white hover:bg-gray-800 active:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  disabled={isUpdatePending}
                  onClick={handleSubmit((data) => handleUpdate(data))}
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 rounded-xl"
                >
                  {isUpdatePending ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => reset()}
                  className="text-blue-700 bg-gray-200 rounded-xl hover:text-white active:text-white hover:bg-gray-800 active:bg-gray-800"
                >
                  Discard
                </Button>
                <Button
                  disabled={isCreatePending}
                  onClick={handleSubmit((data) => handleSave(data, "Draft"))}
                  className="text-white bg-gray-800 dark:text-neutral-900 hover:bg-gray-900 focus:bg-gray-900 dark:bg-white dark:hover:text-neutral-200 rounded-xl"
                >
                  Save as Draft
                </Button>
                <Button
                  disabled={isCreatePending}
                  type="submit"
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 rounded-xl"
                >
                  {isCreatePending ? "Saving..." : "Save & Send"}
                </Button>
              </>
            )}
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default InvoiceForm;
