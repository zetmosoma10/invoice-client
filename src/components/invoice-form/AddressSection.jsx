import Input from "../common/Input";

const AddressSection = ({ register, errors, baseId }) => {
  return (
    <div className="space-y-6">
      <Input
        register={register}
        errors={errors?.[baseId]?.street}
        label="Street Address"
        id={`${baseId}.street`}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <Input
          register={register}
          errors={errors?.[baseId]?.city}
          label="City"
          id={`${baseId}.city`}
        />
        <Input
          register={register}
          errors={errors?.[baseId]?.postalCode}
          label="Post Code"
          id={`${baseId}.postalCode`}
        />
        <div className="col-span-2 md:col-span-1">
          <Input
            register={register}
            errors={errors?.[baseId]?.country}
            label="Country"
            id={`${baseId}.country`}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressSection;
