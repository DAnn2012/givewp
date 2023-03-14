export const StyleConfig = {
    control: (provided, state) => ({
        ...provided,
        outline: 'none',
        height: 32,
        background: '#fff',
        borderRadius: 2,
        boxShadow: '0 2px 4px 0 #ebebeb',
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        background: '#fff',
        height: '100%',
        borderRadius: 2,
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        background: '#fff',
        height: '100%',
        borderRadius: 2,
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#F2F9FF' : '#FFF',
        fontWeight: state.isSelected ? '600' : '400',
        fontSize: '14px',
    }),
    singleValue: (provided, state) => ({
        ...provided,
        fontSize: '0.875rem',
        fontWeight: 500,
    }),
    placeholder: (provided, state) => ({
        ...provided,
        fontSize: '14px',
        fontWeight: '400',
    }),
};
