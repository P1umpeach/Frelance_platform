"""Changed tokens table to try fix an auth

Revision ID: ba65d9391caa
Revises: 01d9ceda172c
Create Date: 2024-05-27 00:16:10.555956

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ba65d9391caa'
down_revision: Union[str, None] = '01d9ceda172c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('tokens', 'token',
               existing_type=sa.UUID(),
               type_=sa.String(),
               nullable=True,
               existing_server_default=sa.text('uuid_generate_v4()'))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('tokens', 'token',
               existing_type=sa.String(),
               type_=sa.UUID(),
               nullable=False,
               existing_server_default=sa.text('uuid_generate_v4()'))
    # ### end Alembic commands ###
