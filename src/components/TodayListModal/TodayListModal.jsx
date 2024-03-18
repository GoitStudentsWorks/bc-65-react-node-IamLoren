import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import sprite from '../../assets/sprite.svg';
import { updatePortionThunk } from '../../redux/statisticData/operations';
import { selectDailyNorma, selectSelectedItem } from '../../redux/selectors';
import { closeModals } from '../../redux/modals/modalsSlice';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

import {
  AmountText,
  ContentItemWrapper,
  CounterWrapper,
  ModalWrapper,
  SubtitleModal,
  TextModal,
  TimeText,
  TitleModal,
  // TimeSelect,
  AmountInput,
  AmountResult,
  SaveButton,
  ResultSaveWrapper,
  StyledTimePicker,
} from './TodayListModal.styled';

const TodayListModal = () => {
  const dispatch = useDispatch();
  const selectedItem = useSelector(selectSelectedItem);
  const dailyNorma = useSelector(selectDailyNorma);
  const [count, setCount] = useState(selectedItem.amount);
  const [selectedTime, setSelectedTime] = useState(selectedItem.time);
  const [inputValue, setInputValue] = useState(count);

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 50);
    }
  };

  const handleIncrement = () => {
    if (count < 1500) {
      setCount(count + 50);
    }
  };

  // const generateTimeOptions = () => {
  //   const options = [];
  //   for (let hour = 0; hour < 24; hour++) {
  //     for (let minute = 0; minute < 60; minute += 5) {
  //       const formattedHour = hour.toString().padStart(2, '0');
  //       const formattedMinute = minute.toString().padStart(2, '0');
  //       options.push(`${formattedHour}:${formattedMinute}`);
  //     }
  //   }
  //   return options;
  // };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputBlur = () => {
    const newValue = parseInt(inputValue, 10) || 0;
    setInputValue(newValue);
    setCount(newValue);
  };

  const onSaveClick = () => {
    const consumeRatio = dailyNorma / count;
    dispatch(
      updatePortionThunk({
        id: selectedItem.id,
        amount: count,
        time: selectedTime,
        dailyNorma,
        consumeRatio,
      })
    );
    dispatch(closeModals());
  };

  useEffect(() => {
    setInputValue(count);
  }, [count]);

  const unformattedTime = new Date();
  const year = unformattedTime.getFullYear();
  const month = String(unformattedTime.getMonth() + 1).padStart(2, '0');
  const day = String(unformattedTime.getDate()).padStart(2, '0');

  const datetime = `${year}-${month}-${day}T${selectedTime}`;
  console.log(datetime);
  console.log(selectedTime);

  const onTimePickerChange = (value) => {
    console.log(value);
    const formattedHour = String(value.$H).padStart(2, '0');
    const formattedMinute = String(value.$m).padStart(2, '0');
    const formattedValue = `${formattedHour}:${formattedMinute}`;
    setSelectedTime(formattedValue);
  };

  return (
    <ModalWrapper>
      <TitleModal>Edit the entered amount of water</TitleModal>
      <ContentItemWrapper>
        <svg className="edit" width={17} height={22} fill="none">
          <use href={sprite + '#icon-glass'}></use>
        </svg>
        <AmountText>{selectedItem.amount} ml</AmountText>
        <TimeText>{selectedItem.time}</TimeText>
      </ContentItemWrapper>
      <div>
        <SubtitleModal>Correct entered data:</SubtitleModal>
        <TextModal>Amount of water:</TextModal>
        <CounterWrapper>
          <button onClick={handleDecrement}>
            <svg width={24} height={24}>
              <use href={sprite + '#icon-minus-small'}></use>
            </svg>
          </button>
          <span>{count} ml</span>
          <button onClick={handleIncrement}>
            <svg width={24} height={24}>
              <use href={sprite + '#icon-plus-small'}></use>
            </svg>
          </button>
        </CounterWrapper>
      </div>
      <div>
        <TextModal>Recording time:</TextModal>
        {/* <TimeSelect
          value={selectedTime}
          onChange={(event) => setSelectedTime(event.target.value)}
        >
          {generateTimeOptions().map((timeOption, index) => (
            <option key={index} value={timeOption}>
              {timeOption}
            </option>
          ))}
        </TimeSelect> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StyledTimePicker
            ampm={false}
            disableFuture={true}
            minutesStep={5}
            value={dayjs(datetime)}
            onChange={(value) => onTimePickerChange(value)}
          />
        </LocalizationProvider>
      </div>

      <div>
        <SubtitleModal>Enter the value of the water used:</SubtitleModal>
        <AmountInput
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          min={0}
        />
      </div>
      <ResultSaveWrapper>
        <AmountResult>{count} ml</AmountResult>
        <SaveButton onClick={onSaveClick} disabled={count <= 0}>
          Save
        </SaveButton>
      </ResultSaveWrapper>
    </ModalWrapper>
  );
};

export default TodayListModal;
