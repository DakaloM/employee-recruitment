'use client'

import { startCase } from "@erecruitment/utils";

import { useEffect, useId, useState } from "react";

import { Checkbox as NativeCheckbox } from "../checkbox";
import { Input, InputProps } from "../input";
import { LocationInput as NativeLocationInput } from '../location-input';
import { MultiSelect as NativeMultiSelect } from "../multi-select";
import { FormLabel } from "../native-form";
import {
  Select as NativeSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../native-select";
import { FormFieldProps } from "./Form";

function createCheckbox() {
  return function CreatedCheckbox(props: FormFieldProps<boolean>) {
    const id = useId();

    return (
      <section className="flex gap-2 my-auto">
        <NativeCheckbox
          {...(props as any)}
          checked={(props as any).value}
          onCheckedChange={(e) => props.onChange(Boolean(e))}
          id={id}
        />
        <FormLabel htmlFor={id}>
          {(props as any).label ?? startCase((props as any).name)}
        </FormLabel>
      </section>
    );
  };
}

function createInput(inputProps: InputProps) {
  return function CreatedInput(props: FormFieldProps<string>) {
    return (
      <section className="flex flex-col gap-2">
        <FormLabel>
          {(props as any).label ?? startCase((props as any).name)}
        </FormLabel>
        <Input
          {...props}
          {...inputProps}
          defaultValue={props.initialValue}
          onChange={(e) => props.onChange(e.target.value)}
        />
      </section>
    );
  };
}

function createLocationInput() {
  return function CreatedInput(props: FormFieldProps<Address>) {
    return (
      <section className="flex flex-col gap-2">
        <FormLabel>{(props as any).label ?? startCase((props as any).name)}</FormLabel>
        <NativeLocationInput
          {...props}
          value={props.initialValue?.text}
          onSelectLocation={(location) => props.onChange(location)}
        />
      </section>
    );
  };
}

function useSelectProps<T>(props: SelectProps<T>) {
  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isFetchProps(props)) {
      setIsLoading(true);
      props
        .fetchOptions()
        .then(setOptions)
        .finally(() => setIsLoading(false));
    } else {
      setOptions(props.options);
    }
  }, []);

  return {
    options,
    isLoading,
  };
}

function createMultiSelect() {
  return function CreatedSelect(
    props: FormFieldProps<string[]> & SelectProps<string[]>
  ) {
    const { options, isLoading } = useSelectProps(props);
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <section className="flex flex-col gap-2">
        <FormLabel>
          {(props as any).label ?? startCase((props as any).name)}
        </FormLabel>
        <NativeMultiSelect
          {...props}
          options={options}
          selected={(props as any).value || []}
          placeholder="..."
          onChange={props.onChange}
        />
      </section>
    );
  };
}

function createSelect() {
  return function CreatedSelect(
    props: FormFieldProps<string> & SelectProps<string>
  ) {
    const { options } = useSelectProps(props);

    return (
      <section className="flex flex-col gap-2">
        <FormLabel>
          {(props as any).label ?? startCase((props as any).name)}
        </FormLabel>
        <NativeSelect
          onValueChange={props.onChange}
          defaultValue={props.initialValue || (props as any).value}
        >
          <SelectTrigger>
            <div className="flex place-items-center gap-2">
              <SelectValue placeholder="..." />
            </div>
          </SelectTrigger>
          <SelectContent className="max-h-[500px] overflow-y-auto">
            {options.map(({ value, label }) => (
              <SelectItem key={label} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </NativeSelect>
      </section>
    );
  };
}


function createSelectWithCheckbox() {
  return function CreatedSelectWithCheckbox(
    props: FormFieldProps<string[]> &
      SelectProps<string[]> & { checkboxLabel: string }
  ) {
    const { options } = useSelectProps(props);
    const [checked, setChecked] = useState(
      Boolean((props as any).value?.length)
    );

    useEffect(() => {
      if (!checked) {
        props.onChange([]);
      }
    }, [checked]);

    return (
      <section className="flex flex-col gap-4">
        <CheckboxInput
          {...{ value: checked }}
          onChange={setChecked}
          label={props.checkboxLabel}
        />

        {checked && (
          <div className="flex flex-col gap-2">
            <FormLabel>
              {(props as any).label ?? startCase((props as any).name)}
            </FormLabel>
            <NativeMultiSelect
              {...props}
              options={options}
              selected={(props as any).value || []}
              placeholder="..."
              onChange={props.onChange}
            />
          </div>
        )}
      </section>
    );
  };
}

export const NumberInput = createInput({
  type: "number",
});

export const TextInput = createInput({
  type: "text",
});

export const TextAreaInput = createInput({
  type: "textarea",
});

export const EmailInput = createInput({
  type: "email",
});

export const DisabledInput = createInput({
  disabled: true,
  className: "bg-gray-300",
});

export const PasswordInput = createInput({
  type: "password",
});

export const DateInput = createInput({
  type: "date",
});

export const SelectWithCheckboxInput = createSelectWithCheckbox();

export const CheckboxInput = createCheckbox();

function isFetchProps<T>(
  props: SelectProps<T>
): props is SelectFetchProps<any> {
  return (props as any).fetchOptions !== undefined;
}

export const Select = createSelect();

export const MultiSelect = createMultiSelect();

export const LocationInput = createLocationInput();

export type Option = { label: string; value: string };

export type FetchOptions = () => Promise<Option[]>;

interface SelectFetchProps<T> {
  fetchOptions: FetchOptions;
}

interface SelectOptionProps<T> {
  options: Option[];
}

type SelectProps<T> = SelectFetchProps<T> | SelectOptionProps<T>;


 type Address = {
  city: string;
  country: string;
  lat: number;
  lng: number;
  placeId?: string;
  postalCode: string;
  province: string;
  suburb: string;
  text: string;
};