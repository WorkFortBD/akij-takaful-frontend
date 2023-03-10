import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/redux/store';
import { changeStampInputValue } from '@/redux/actions/stamp-action';
import { PageHeader } from '@/components/layouts/PageHeader';
import Button from '@/components/button';
import Input from '@/components/input';

export default function StampCreate() {
    const dispatch = useDispatch();
    const { stampForm, isSubmitting } = useSelector((state: RootState) => state.stamp);

    const onSubmit = (e: any) => {
        e.preventDefault();
        alert('submitted.');
    }

    const changeTextInput = (name: string, value: any) => {
        dispatch(changeStampInputValue(name, value));
    };

    return (
        <div>
            <PageHeader
                title='New stamp'
                hasSearch={false}
                headerRightSide=<></>
            />

            <form
                method="post"
                autoComplete="off"
            >
                <Input
                    label="Bank Name"
                    name="project_id"
                    placeholder='Bank Name'
                    value={stampForm.project_id}
                    isRequired={true}
                    inputChange={changeTextInput}
                />

                <Button
                    title="Save"
                    onClick={(e: any) => onSubmit(e)}
                    position="text-left"
                    loadingTitle="Saving..."
                    loading={isSubmitting}
                />
            </form>
        </div>
    );
}
